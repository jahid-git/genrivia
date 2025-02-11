AndroidApi.SetStatusBarColor("#091921");
AndroidApi.SetNavigationBarColor("#091921");

window.onBackPressed = () => {
    AndroidApi.Vibrate(150);
    AndroidApi.ShowDialog(0,"Exit!","Do you want to exit?","true","Yes","No");
    return true;
}

window.onDialogPositive = position => {
    if(position == 0){
        AndroidApi.Exit();
    }
}