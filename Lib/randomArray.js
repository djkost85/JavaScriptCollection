function randomArray(a) {
    for (var i = 0; i < a.length; i++) {
        var index1 = Math.floor((a.length) * Math.random());
        var index2 = Math.floor((a.length) * Math.random());

        var temp = a[index1];
        a[index1] = a[index2];
        a[index2] = temp;
    }

    return a;
}