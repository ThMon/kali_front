import * as Google from "expo-auth-session/providers/google";

// GOOGLE


export function connectGoogle(Google: any){
    const [requestGoogle, responseGoogle, promptAsyncGoogle] = Google.useAuthRequest({
        androidClientId: "666162941025-p09ir48dgmj3p74cullcpfsppfsdoef6.apps.googleusercontent.com",
        iosClientId: "666162941025-ebb4asdmd6d3urp497b322f0oi240l9h.apps.googleusercontent.com",
        expoClientId: "666162941025-tnuse0jsmjjpvtmuda4lbgjpul13ql7d.apps.googleusercontent.com"
    });

    return {
        requestGoogle, 
        responseGoogle, 
        promptAsyncGoogle
    }
}