export function random(len) {
    const str = "qwertyuioplkjhgfdsazxcvbnm1234567890QWERTYUIOPLKJHGFDSAZXCVBNM";
    const length = str.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += str[Math.floor(Math.random() * length)];
    }
    return ans;
}
//# sourceMappingURL=utils.js.map