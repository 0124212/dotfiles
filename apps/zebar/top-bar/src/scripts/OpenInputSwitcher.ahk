#Requires AutoHotkey v2.0
#SingleInstance Force

; WinKeyToRaycast.ahk uses $LWin which only hooks PHYSICAL key presses.
; Synthetic keys sent by this script bypass it entirely and go straight
; to Windows — so this Send DOES reach the Windows language switcher.
Send "{LWin down}{Space}{LWin up}"

ExitApp()





