import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./jwt.guard";

@Module({
    imports: [
        PassportModule,
        JwtModule.register(
            {
                global: true,
                secret: process.env.TOKEN_KEY,
                signOptions: { expiresIn: '10m' }
            }
        )
    ],
    providers: [
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ]
})
export class AuthModule { }