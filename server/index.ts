import express,{Express,Request,Response} from "express";

const app = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("it works");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




