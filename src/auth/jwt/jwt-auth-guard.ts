import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(error: null | Error, user: User | false, info: Error): any {
        if (error || !user) {
            console.log(info);
            throw error || new UnauthorizedException("유효하지 않은 토큰입니다.");
        }
    }
}
