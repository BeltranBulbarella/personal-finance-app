import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { path } = request.route;

    // Exclude authentication for login and register routes
    if (path === '/users/login' || path === '/users/register') {
      return true;
    }

    return super.canActivate(context);
  }
}
