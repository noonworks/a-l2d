export function showError(msg: string, error?: Error): void {
  let errmsg = '[A-L2D ERROR] ';
  if (msg.length > 0) {
    errmsg += msg;
  } else if (error) {
    errmsg += error.message;
  }
  console.log(errmsg);
  console.log(error);
  alert('[A-L2D] 想定外のエラーが発生しました。\n' + errmsg);
}
