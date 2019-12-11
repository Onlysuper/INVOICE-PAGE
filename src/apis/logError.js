export const logError = (name, action, info) => {
    if (!info) {
      info = 'empty'
    }
    try {
      let deviceInfo = wx.getSystemInfoSync()
      var device = JSON.stringify(deviceInfo)
    } catch (e) {
      throw new Error('not support getSystemInfoSync api', err.message)
    }
    let time = formatTime(new Date())
    throw new Error(time, name, action, info, device)
    // if (typeof action !== 'object') {
    // fundebug.notify(name, action, info)
    // }
    // fundebug.notifyError(info, { name, action, device, time })
    if (typeof info === 'object') {
      info = JSON.stringify(info)
    }
}