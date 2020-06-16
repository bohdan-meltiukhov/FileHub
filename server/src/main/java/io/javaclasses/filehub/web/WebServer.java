package io.javaclasses.filehub.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;

import java.lang.reflect.Type;

import static spark.Spark.*;

public class WebServer {

    public static void main(String[] args) {

        staticFileLocation("/ui-components");

        path("/api", () -> {
            post("/register", (request, response) -> {
//                GsonBuilder builder = new GsonBuilder();
//                builder.registerTypeAdapter(UserCredentials.class, )
                Gson gson = new Gson();
//                String str = gson.fromJson(request.body(), String.class);
                try {
                    UserCredentials credentials = gson.fromJson(request.body(), UserCredentials.class);
                System.out.println(credentials.toString());
                response.status(200);
                return 200;
                } catch (Exception e) {
                    System.out.println(e);
                    return e;
                }
            });
            get("/hello", (request, response) -> "Hello");

            get("/init", (request, response) -> {
                init();
                return "initialized";
            });


        });
    }

//    private class UserCredentialsDeserializer implements JsonDeserializer<UserCredentials>{
//        public UserCredentials deserialize(JsonElement json, Type typeOf)
//    }

    private static class UserCredentials{
        public String username;
        public String password;

        public UserCredentials(String username, String password) {
            this.username = username;
            this.password = password;
        }

        @Override
        public String toString() {
            return "UserCredentials{" +
                    "username='" + username + '\'' +
                    ", password='" + password + '\'' +
                    '}';
        }
    }
}
