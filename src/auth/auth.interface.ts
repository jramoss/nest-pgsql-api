import { Request } from "express"

export interface Authinterface extends Request
{
    
    req:{user: {
       sub: string
       username: string
       roles: string[]
      }
    }
}