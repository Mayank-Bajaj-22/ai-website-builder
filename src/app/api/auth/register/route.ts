import connectDB from "@/lib/db";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const { name, email, password } = await req.json()

        if ([name, email, password].some((fields) => fields?.trim() === "")) {
            return NextResponse.json(
                {
                    message: "All fields are required"
                },
                {
                    status: 400
                }
            )
        }

        const existUser = await User.findOne({ email })

        if (existUser) {
            return NextResponse.json(
                {
                    message: "User already exists"
                },
                {
                    status: 400
                }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                {
                    message: "Passowrd must contain atleat 6 characters"
                }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email, 
            password: hashedPassword
        })

        return NextResponse.json(
            user, 
            {
                status: 201
            }
        )
    } catch (error) {
        return NextResponse.json(
            { message: `register error in route.ts file ${error}` },
            { status: 500 }
        )
    }
}