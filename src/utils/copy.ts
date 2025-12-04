

/**
 * Copy the given @param text to clipboard
 * @param text to copy
 */
async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        // alert("Copied!!");
    } catch (err) {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        // alert("Copied!!");
    }
}

export default copyToClipboard;