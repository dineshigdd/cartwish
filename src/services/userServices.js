import apiClient from "../utils/api-client";

export function signup( user , profile ) {
    const body = new FormData();
  
    body.append("name", user.name );
    body.append("email", user.email );
    body.append("password", user.password );
    body.append("deliveryAddress", user.deliveryAddress );
    body.append("profilePic", profile );

    return apiClient.post("/user/signup", body );
}

//in this function , we do not use FormData because backend route is not created to support FormData (i.e., multipart/form-data)
export function login( user ){      
    body.append("email", user.email );
    body.append("password", user.password );   
    return apiClient.post("/user/login", user  );
}