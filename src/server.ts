import express,{
  Express,
} from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { authRoute, rolRoute, userRoute } from './routes';


export default class Server {
  private app: Express;
  constructor(){
    this.app = express();

    this.middlewares();
    this.routes();
    this.listen();
  }

  middlewares(): void{
    //para que me acepte los pedidos json
    this.app.use(express.json());
    //para urlear el servidor
    this.app.use(express.urlencoded({extended: true}))

    //cors para las peticiones
    this.app.use(cors({
      methods: '*',
      exposedHeaders: ["auth_token"]
    }));
    //para las imagenes 
    this.app.use(fileUpload({
      useTempFiles:true,
      tempFileDir:'./tmp'
}))
  }
  routes(): void {
    const api = "api";
    this.app.use(`/${api}/user`,userRoute);
    this.app.use(`/${api}/rol`, rolRoute);
    this.app.use(`/${api}/auth`,authRoute)
  }

  listen(): void {
    this.app.listen(3000, ()=>{
      console.log("server on port 3000");
      
    })
  }

}