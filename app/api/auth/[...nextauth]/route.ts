import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "employee-login",
      name: "Employee Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          const employee = await prisma.employee.findFirst({
            where: {
              OR: [
                { username: credentials.username },
                { email: credentials.username }
              ]
            }
          });

          if (!employee) {
            return null;
          }

          if (employee.status !== "ACTIVE") {
            return null;
          }

          if (employee.isLocked && employee.lockUntil && employee.lockUntil > new Date()) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, employee.password);

          if (!isPasswordValid) {
            await prisma.employee.update({
              where: { id: employee.id },
              data: { 
                failedAttempts: { increment: 1 },
                isLocked: employee.failedAttempts + 1 >= 5,
                lockUntil: employee.failedAttempts + 1 >= 5 ? new Date(Date.now() + 30 * 60 * 1000) : null
              }
            });
            return null;
          }

          // Reset failed attempts on success
          if (employee.failedAttempts > 0) {
            await prisma.employee.update({
              where: { id: employee.id },
              data: { failedAttempts: 0, isLocked: false, lockUntil: null }
            });
          }

          // Log audit
          await prisma.auditLog.create({
            data: {
              userId: employee.id,
              userRole: employee.role,
              action: "LOGIN",
              details: "Employee logged in successfully",
            }
          });

          return {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            role: employee.role,
            type: "employee"
          };
        } catch (error) {
          console.error("Employee login authorize error:", error);
          return null;
        }
      }
    }),
    CredentialsProvider({
      id: "member-login",
      name: "Member Login",
      credentials: {
        memberId: { label: "Member ID", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.memberId || !credentials?.password) {
          throw new Error("Missing Member ID or password");
        }

        const member = await prisma.member.findUnique({
          where: { memberId: credentials.memberId }
        });

        if (!member) {
          throw new Error("Invalid Member ID or password");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, member.password);

        if (!isPasswordValid) {
          throw new Error("Invalid Member ID or password");
        }

        await prisma.auditLog.create({
          data: {
            userId: member.id,
            userRole: "MEMBER",
            action: "LOGIN",
            details: "Member logged in successfully",
          }
        });

        return {
          id: member.id,
          name: member.name,
          email: member.email,
          role: "MEMBER",
          type: "member"
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.type = (user as any).type;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).type = token.type;
      }
      return session;
    }
  },
  pages: {
    signIn: "/employee-login",
    error: "/employee-login"
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
