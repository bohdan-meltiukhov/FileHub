package io.javaclasses.filehub.server;

public class CreateFolderCommand {

    public Folder createFolder(Token token) {

        return new Folder(generateRandomId(16), "root", "New Folder", 0);
    }

    private static String generateRandomId(int length) {
    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        StringBuilder result = new StringBuilder();
        for (int i = 0; i < length; i++) {
            result.append(characters.charAt((int) Math.floor(Math.random() * characters.length()) ));
        }
        return result.toString();
    }
}
