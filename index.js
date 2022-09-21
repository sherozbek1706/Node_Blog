// Matematika3sinf

const express = require("express");
const path = require("path");
const User = require("./models/User");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const connectFlash = require("connect-flash");
const app = express();
const http = require("http").createServer(app);
const ip = require("ip");
const io = require("socket.io")(http);

const homePageController = require("./controllers/homePage");
const getPostsController = require("./controllers/getPosts");
const postsNewController = require("./controllers/postsNew");
const createPostsController = require("./controllers/createPost");
const aboutPage = require("./controllers/aboutPage");
const createUserController = require("./controllers/createUser");
const userStoreControllaer = require("./controllers/userStore");
const LoginController = require("./controllers/login");
const LoginStoreController = require("./controllers/loginStore");
const logoutController = require("./controllers/logout");
const dashboardController = require("./controllers/dashboard");
const dashboardPanelController = require("./controllers/dashbardPanel");
const ProfileController = require("./controllers/Profile");

const authController = require("./controllers/auth");
const validationMiddleWare = require("./middleware/validationMiddleware");
const redirectIfAuth = require("./middleware/redirect");
const dashboardPanel = require("./middleware/dashboardRest");

const session = require("express-session");

const PORT = process.env.PORT || 3000;
const MongoURL =
  "mongodb+srv://sherozbek:Matematika3sinf@cluster0.ymqgrib.mongodb.net/node-blog";

mongoose.connect(MongoURL);

app.use(
  expressSession({
    secret: "sherozbek",
    store: MongoStore.create({ mongoUrl: MongoURL }),
  })
);

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge.engine);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(connectFlash());

app.set("views", `${__dirname}/views`);

app.use((req, res, next) => {
  app.locals.auth = req.session.userId;
  next();
});

app.get("/", homePageController);
app.get("/posts/all", aboutPage);

app.get("/post/:id", getPostsController);
app.get("/posts/new", authController, postsNewController);
app.post(
  "/posts/create",
  authController,
  validationMiddleWare,
  createPostsController
);
app.get("/reg", createUserController);
app.post("/auth/reg", userStoreControllaer);
app.get("/login", LoginController);
app.post("/auth/log", LoginStoreController);
app.get("/logout", authController, logoutController);

app.get(`/dashboard/admin`, dashboardController);
app.get(
  `/dashboard/630ceff228b661866621f0df`,
  dashboardPanel,
  dashboardPanelController
);

app.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", docs);
    }
  });
  console.log("Delete Progress " + id);
  res.redirect("/dashboard/admin");
});

app.get("/profile/:id", redirectIfAuth, ProfileController);

app.get("/chat/:id/app/:id", redirectIfAuth, (req, res) => {
  const { id } = req.params;
  
  console.log(id);

  User.findOne({ _id: id }, (err, user) => {
    console.log(user.username);
    res.render("chat", { user });
  });
});

io.on("connection", (socket) => {
  console.log("Connect User...");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
    console.log(msg);
  });
});

app.use((req, res) => res.render("not_found"));

http.listen(PORT, () => {
  console.log("listening on http://localhost:" + PORT);
  console.log("on network " + "http://" + ip.address() + ":" + PORT);
});
