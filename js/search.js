$("#searchterm").keyup(function (e) {
    var q = $("#searchterm").val();
    $.getJSON("http://en.wikipedia.org/w/api.php?callback=?", {
        srsearch: q,
        action: "query",
        list: "search",
        format: "json"
    },

    function (data) {
        $("#results").empty();
        $("#results").append("Results for: " + q + "");
        $.each(data.query.search, function (i, item) {
            $("#results").append("<li><a href='http://en.wikipedia.org/wiki/" + encodeURIComponent(item.title) + "'>" + item.title + "</a><br>" + item.snippet + "</li>");
        });
    });
});
