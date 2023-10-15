// import custom css on the fly
import '../../styles/dialog.css'

/**
 * Shows or hide default dialog (#dialogBox)
 * @param flag `true` to show, `false` to close
 */
export function showDialog(flag: boolean) {
    const modalDialog = document.getElementById("dialogBox");
    if(flag) {
        modalDialog.showModal();
    } else {
        modalDialog.close();
    }
}

/**
 * Represents dialog UI display structure
 */
export class DialogData {
    public title = '';
    public message = '';
    public hash = '';
}