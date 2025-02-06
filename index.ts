import express,{ Express} from "express"; 
import dotenv from  "dotenv"
import * as database from "./config/database";

import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/system";
import methodOverride from "method-override";
import path from "path";
import bodyParser from "body-parser";

dotenv.config();

database.connect();

const app: Express = express();
const port:string | number = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.set('views', `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;


// TinyMCE
app.use(
    "/tinymce",
    express.static(path.join(__dirname, "node_modules", "tinymce"))
  );
  // End TinyMCE


// CLient Routes
clientRoutes(app);

// Admin Routes
adminRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})