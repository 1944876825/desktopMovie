// import { ipcRenderer } from 'electron'

export const HandleWindow = (data: string) => {
  window.api!['handleWindow'](data)
}
export const IsWindowsMax = async () => {
  return await window.api!['isWindowMaximized']()
}

export const OnWindowsMax = (handleWindowMaximized: VoidFunction) => {
  window.api!['onWindowMaximized'](handleWindowMaximized)
}
