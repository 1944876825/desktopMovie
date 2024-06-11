// import {WindowFullscreen, WindowIsFullscreen, WindowMinimise, WindowUnfullscreen} from "../../wailsjs/runtime";
// import {CloseWindows} from "../../wailsjs/go/main/App";

export const HandleWindow = (data: string) =>  {
    if (data == 'min') {
        // WindowMinimise()
    } else if (data == 'max') {
        // WindowFullscreen()
    } else if (data == 'close') {
        // CloseWindows().then()
    } else if (data == 'unmax') {
        // WindowUnfullscreen()
    }
}