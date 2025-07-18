import apiClient from "../utils/api-client";
import { jwtDecode } from 'jwt-decode'

const tokenName = 'token';
//Signup and login functions before adding localStorage

/**
export function signup( user , profile ) {
    const body = new FormData();  
    body.append("name", user.name );
    body.append("email", user.email );
    body.append("password", user.password );
    body.append("deliveryAddress", user.deliveryAddress );
    body.append("profilePic", profile );
    
    return apiClient.post("/user/signup", body );
}

//in this function , we do not use FormData in the login function , because backend route is not created to support FormData (i.e., multipart/form-data)

export function login( user ){      
    return apiClient.post("/user/login", user  );
}

**/

//After adding localStrage to store the token with this function, we can remove addingtoken to localStorage in login page an signup page

export async function signup( user , profile ) {
    const body = new FormData();
  
    body.append("name", user.name );
    body.append("email", user.email );
    body.append("password", user.password );
    body.append("deliveryAddress", user.deliveryAddress );
    body.append("profilePic", profile );

    const { data } = await apiClient.post("/user/signup", body );
    localStorage.setItem(tokenName, data.token )
}


export async function login( user ){      
    const { data } = await apiClient.post("/user/login", user  );
    localStorage.setItem(tokenName, data.token );
}

export function logout(){
    localStorage.removeItem(tokenName);
}

export function getUser(){
    try{
        const jwt = localStorage.getItem(tokenName);
        return jwtDecode( jwt );
    }catch( error ){
        return null;
    }
    
}

export function getJwt(){
    return localStorage.getItem( tokenName )
}