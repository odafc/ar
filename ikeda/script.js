var map = L.map('mapid').setView([ 35.12637 , 132.55919], 15);

        var baseMap = [ // ベースマップの定義
            L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
                minZoom: 5, maxZoom: 18
            }),
            L.tileLayer("https://cm02.mapion.co.jp/m2/tile/{z}/{x}/{y}.png?usr=atlas_org&amp;v=2.6", {
                minZoom: 6, maxZoom: 19
            }),
        ];

        var overMap = [ // オーバーレイマップの定義
            L.tileLayer("https://ariill-design.jp/xyz/kihon/{z}/{x}/{y}.png", {
                minZoom: 16, maxZoom: 19
            }),
            L.tileLayer("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
                minZoom: 2, maxZoom: 19
            }),
            L.tileLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg", {
                minZoom: 2, maxZoom: 18
            }),
            L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg", {
                minZoom: 2, maxZoom: 18
            }),
            L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg", {
                minZoom: 10, maxZoom: 17
            }),
            L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/ort_old10/{z}/{x}/{y}.png", {
                minZoom: 2, maxZoom: 17
            }),
            L.tileLayer("https://mars.navitime.co.jp/mars/tile/v1/satellite/256/{z}/{y}/{x}", {
                minZoom: 2, maxZoom: 19
            }),
        ];


        var gj = L.geoJson(ikeda, {
            style: function (feature) {
                return { fillColor: "#00f", color: "#f00", weight: 3, opacity: 0.6, fillOpacity: 0.05, };
            },
            onEachFeature: function (j, layer) {
                let p = j.properties;
                if (p) {
                    let name = p.name, desc = p.name2;
                    let popup = "<h3>" + name + "</h3>" + "<p>" + desc + "</p>";
                    layer.bindPopup(popup);
                }
            }
        });
        var baseCtl = { // ベースマップ切替ボタンの定義
            "地理院標準地図": baseMap[0],
            "マピオン": baseMap[1],
        };

        var overCtl = { // オーバーレイマップ切替ボタンの定義
            "境界調査": gj,
            "基本図": overMap[0],
            "Google最新写真": overMap[1],
            "Esri航空写真": overMap[2],
            "NTT航空写真": overMap[6],
            "地理院最新写真": overMap[3],
            "1970年頃写真": overMap[4],
            "1960年頃写真": overMap[5],
        };



        baseMap[0].addTo(map);
        L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map); // 目盛表示
        L.control.opacityLayers(baseCtl, overCtl, { collapsed: true }).addTo(map); // 透過付マップ切替


        // add location control to global name space for testing only
        // on a production site, omit the "lc = "!
        lc = L.control
            .locate({
            })
            .addTo(map);
