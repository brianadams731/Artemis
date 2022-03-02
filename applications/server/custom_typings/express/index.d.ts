import { User } from "../../src/models/User";


declare global{ 
    namespace Express {
        interface Request {
            // TODO: ADD EXTRA FIELDS TO THE REQUEST OBJECT HERE
        }
    }
}
