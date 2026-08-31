#Requires AutoHotkey v2.0
#SingleInstance Force

windowID := A_Args[1]
if WinExist("ahk_id " windowID) {
    if WinGetMinMax("ahk_id " windowID) = -1  ; -1 = minimized
        WinRestore("ahk_id " windowID)
    WinActivate("ahk_id " windowID)
}
ExitApp()
