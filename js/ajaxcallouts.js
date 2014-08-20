var BackEndServiceCaller = (function () {

    // Public methods here
    return {
        doCallout: function (callback) {

            $.get("/circles", callback);

        },

        doserverCallout: function (callback) {

            $.get("/licenseholder/index", callback);

        }
    }

}())



