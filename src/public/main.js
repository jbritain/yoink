function yoink(){
    fetch(`${window.location.href}yoink`, {
        method: 'POST'
    });
}