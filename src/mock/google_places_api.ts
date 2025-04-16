export const result : () => google.maps.places.PlaceResult[] = () => [
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.007073499999997, -34.8407638),
            viewport: new google.maps.LatLngBounds(
            { lat: -8.008431930291502, lng: -34.8420878302915 }, // SW
            { lat: -8.005733969708498, lng: -34.8393898697085 }  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
        name: "Espigão Restaurante Bar -Bairro Novo Olinda",
        opening_hours: {
            open_now: true,
            isOpen: () => true
        },
        photos: [
            {
                height: 640,
                width: 640,
                html_attributions: [
                '<a href="https://maps.google.com/maps/contrib/103124799958444526369">Gerlania Oliveira</a>'
                ],
                getUrl: (opts?: google.maps.places.PhotoOptions) => {
                // você pode retornar uma URL genérica ou fictícia baseada em width/height
                return "https://maps.google.com/maps/contrib/111441672491472842963640";
                }
            }
        ],
        place_id: "ChIJ_aWQZLUiqwcRgv86vvYGHCg",
        plus_code: {
            compound_code: "X5V5+5M Bairro Novo, Olinda - PE, Brazil",
            global_code: "6937X5V5+5M"
        },
        price_level: 2,
        rating: 4.3,
        types: [
            "bar",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
        ],
        user_ratings_total: 4857,
        vicinity: "Avenida Ministro Marcos Freire, 569 - Bairro Novo, Olinda",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.0628345, -34.8730428),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.064212530291503, -34.8744514802915), // SW
                new google.maps.LatLng(-8.061514569708498, -34.87175351970851)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
        name: "Bodega de Véio - Recife Antigo",
        opening_hours: {
            open_now: true,
            isOpen: () => true, // dummy function
            periods: [],
            weekday_text: []
        },
        photos: [
            {
                height: 1184,
                width: 888,
                html_attributions: [
                    '<a href="https://maps.google.com/maps/contrib/113955362726346740307">Bodega de Véio</a>',
                ],
                getUrl: (opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/113955362726346740307"
            }
        ],
        place_id: "ChIJeZu8KqUYqwcRe5zMAXd1S7I",
        plus_code: {
            compound_code: "W4PG+VQ Recife, State of Pernambuco, Brazil",
            global_code: "6937W4PG+VQ"
        },
        price_level: 2,
        rating: 4.5,
        types: ["bar", "point_of_interest", "establishment"],
        user_ratings_total: 3249,
        vicinity: "Rua Mariz e Barros, 328 - Recife",
        html_attributions: []
    },


    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.0621735, -34.8786676),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.063516230291503, -34.88001558029149), // SW
                new google.maps.LatLng(-8.060818269708498, -34.87731761970849)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/place_api/icons/v2/bar_pinlet",
        name: "Pagode do Didi",
        opening_hours: {
            open_now: false,
            isOpen: () => false,
            periods: [],
            weekday_text: []
        },
        photos: [
            {
                height: 3000,
                width: 4000,
                html_attributions: [
                    '<a href="https://maps.google.com/maps/contrib/111441672491472842963">Dalmario Neto</a>'
                ],
                getUrl: (opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963"
            }
        ],
        place_id: "ChIJ85LI_bsYqwcRUaBg9jKa7Jk",
        plus_code: {
            compound_code: "W4QC+4G Santana, Recife - PE, Brazil",
            global_code: "6937W4QC+4G"
        },
        price_level: 1,
        rating: 4.6,
        types: ["bar", "point_of_interest", "establishment"],
        user_ratings_total: 354,
        vicinity: "Rua Ulhôa Cintra, 39 - Santana, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.0504052, -34.9274331),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.051806880291503, -34.92868738029149), // SW
                new google.maps.LatLng(-8.049108919708498, -34.9259894197085)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
        name: "CATAXÁ MOTO CLUB - Faction Recife - PE.",
        photos: [
            {
                height: 2448,
                width: 3264,
                html_attributions: [
                    '<a href="https://maps.google.com/maps/contrib/105248163937337519021">Peter Maia</a>'
                ],
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963"
            }
        ],
        place_id: "ChIJkd074RQZqwcRNXe2n1mR7Xw",
        plus_code: {
            compound_code: "W3XF+R2 Cordeiro, Recife - State of Pernambuco, Brazil",
            global_code: "6937W3XF+R2"
        },
        rating: 3.7,
        types: ["night_club", "bar", "point_of_interest", "establishment"],
        user_ratings_total: 3,
        vicinity: "Estrada do Forte do Arraial Novo do Bom Jesus, 344 - Cordeiro, Recife",
        html_attributions: []
    },


      {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.049215499999999, -34.8815937),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.050658480291501, -34.8830104802915), // SW
                new google.maps.LatLng(-8.047960519708496, -34.8803125197085)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
        name: "MPB Bar e Restaurante",
        opening_hours: {
            open_now: false,
            isOpen: () => false,
            periods: [],
            weekday_text: []
        },
        photos: [
            {
                height: 4080,
                width: 3072,
                html_attributions: [
                    '<a href="https://maps.google.com/maps/contrib/111913170028012523271">Monique Silva</a>'
                ],
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963"
            }
        ],
        place_id: "ChIJjRzDV5IYqwcRJo9dIZZnjA4",
        plus_code: {
            compound_code: "X429+89 Santo Amaro, Recife - State of Pernambuco, Brazil",
            global_code: "6937X429+89"
        },
        price_level: 1,
        rating: 4.4,
        types: ["bar", "point_of_interest", "establishment"],
        user_ratings_total: 425,
        vicinity: "Rua Pedro Afonso, 318 - Santo Amaro, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.0536651, -34.9201748),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.055045230291503, -34.9214620802915), // SW
                new google.maps.LatLng(-8.052347269708498, -34.9187641197085)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
        icon_background_color: "#7B9EB0",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        name: "Sala de Reboco",
        opening_hours: {
            open_now: false,
            isOpen: () => false,
            periods: [],
            weekday_text: []
        },
        photos: [
            {
                height: 309,
                width: 945,
                html_attributions: [
                    '<a href="https://maps.google.com/maps/contrib/101715396741981970790">Sala de Reboco</a>'
                ],
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/11144167249147284296"
            }
        ],
        place_id: "ChIJKVpGdj0ZqwcR5V71db6Ms8s",
        plus_code: {
            compound_code: "W3WH+GW Cordeiro, Recife - State of Pernambuco, Brazil",
            global_code: "6937W3WH+GW"
        },
        rating: 4.5,
        types: ["night_club", "point_of_interest", "establishment"],
        user_ratings_total: 2182,
        vicinity: "Rua Gregório Júnior, 264 - Cordeiro, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.CLOSED_TEMPORARILY,
        geometry: {
            location: new google.maps.LatLng(-8.0578718, -34.8799395),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.059192230291501, -34.8814051302915), // SW
                new google.maps.LatLng(-8.056494269708496, -34.87870716970851)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
        name: "Bar Central",
        permanently_closed: true,
        photos: [
            {
                height: 3000,
                width: 4000,
                html_attributions: [
                    '<a href="https://maps.google.com/maps/contrib/115002982439219988378">Ana Carolina Oliveira</a>'
                ],
                getUrl: (_opts?: google.maps.places.PhotoOptions) =>
                    "https://maps.google.com/maps/contrib/111441672491472842963"
            }
        ],
        place_id: "ChIJR6hyFr4YqwcR_GBY8pifa3g",
        plus_code: {
            compound_code: "W4RC+V2 Santo Amaro, Recife - State of Pernambuco, Brazil",
            global_code: "6937W4RC+V2"
        },
        price_level: 2,
        rating: 4.4,
        types: ["bar", "restaurant", "food", "point_of_interest", "establishment"],
        user_ratings_total: 2682,
        vicinity: "Rua Mamede Simões, 144 - Loja - 8 - Santo Amaro, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.059004, -34.88771689999999),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.060388030291504, -34.88900028029149), // SW
                new google.maps.LatLng(-8.0576900697085, -34.88630231970849)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
        name: "Restaurante Mustang",
        opening_hours: {
            open_now: true,
            isOpen: () => true,
            periods: [],
            weekday_text: []
        },
        photos: [
            {
                height: 3024,
                width: 4032,
                html_attributions: [
                    '<a href="https://maps.google.com/maps/contrib/104922374532712116815">Restaurante Mustang</a>'
                ],
                getUrl: (_opts?: google.maps.places.PhotoOptions) =>
                    "https://maps.google.com/maps/contrib/111441672491472842963"
            }
        ],
        place_id: "ChIJ5yXUBMEYqwcRMuu9OjuN7KU",
        plus_code: {
            compound_code: "W4R6+9W Boa Vista, Recife - State of Pernambuco, Brazil",
            global_code: "6937W4R6+9W"
        },
        price_level: 2,
        rating: 4.2,
        types: ["restaurant", "bar", "food", "point_of_interest", "establishment"],
        user_ratings_total: 1643,
        vicinity: "Rua José de Alencar, 44 - Boa Vista, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.0593345, -34.8917004),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.060637280291504, -34.8930407302915), // SW
                new google.maps.LatLng(-8.057939319708499, -34.8903427697085)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
        name: "Conchittas Bar",
        opening_hours: {
            open_now: false,
            isOpen: () => false,
        },
        photos: [
            {
                height: 1250,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/105044543779000275659\">Conchittas Bar</a>"
                ],
                width: 1562,
                getUrl: (_opts?: google.maps.places.PhotoOptions) =>
                    "https://maps.google.com/maps/contrib/105044543779000275659"
            }
        ],
        place_id: "ChIJGwAAADCMsXoR-qHUAsNskw0",
        plus_code: {
            compound_code: "W4R5+78 Boa Vista, Recife - State of Pernambuco, Brazil",
            global_code: "6937W4R5+78"
        },
        price_level: 2,
        rating: 4.4,
        types: ["bar", "point_of_interest", "establishment"],
        user_ratings_total: 2764,
        vicinity: "Avenida Manoel Borba, 709 - Boa Vista, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.0361376, -34.9101448),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.037516180291501, -34.9115861302915), // SW
                new google.maps.LatLng(-8.034818219708496, -34.9088881697085)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
        name: "Guaiamum Gigante",
        opening_hours: {
            open_now: true,
            isOpen: () => true,
        },
        photos: [
            {
                height: 3472,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/101220974351656176921\">Pio Stremel</a>"
                ],
                width: 4624,
                getUrl: (_opts?: google.maps.places.PhotoOptions) =>
                    "https://maps.google.com/maps/contrib/101220974351656176921"
            }
        ],
        place_id: "ChIJ9WqSdaoZqwcRe5RoIJgd9W8",
        plus_code: {
            compound_code: "X37Q+GW Parnamirim, Recife - PE, Brazil",
            global_code: "6937X37Q+GW"
        },
        price_level: 3,
        rating: 4.5,
        types: ["bar", "restaurant", "food", "point_of_interest", "establishment"],
        user_ratings_total: 5471,
        vicinity: "Rua Doutor José de Góes, 299 - Parnamirim, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.CLOSED_TEMPORARILY,
        geometry: {
            location: new google.maps.LatLng(-8.0326074, -34.92338829999999),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.033903180291503, -34.92474613029149), // SW
                new google.maps.LatLng(-8.031205219708498, -34.92204816970849)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
        name: "Barchef Mercado Gourmet",
        permanently_closed: true,
        photos: [
            {
                height: 612,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/106550511928725736809\">Barchef Mercado Gourmet</a>"
                ],
                width: 612,
                getUrl: (_opts?: google.maps.places.PhotoOptions) =>
                    "https://maps.google.com/maps/contrib/106550511928725736809"
            }
        ],
        place_id: "ChIJ9cNFzKAZqwcRwE87RtyDsfo",
        plus_code: {
            compound_code: "X38G+XJ Poço da Panela, Recife - State of Pernambuco, Brazil",
            global_code: "6937X38G+XJ"
        },
        price_level: 3,
        rating: 4.4,
        types: ["bar", "restaurant", "food", "point_of_interest", "store", "establishment"],
        user_ratings_total: 1458,
        vicinity: "Rua Marquês de Tamandaré, 59 - Poço da Panela, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.0589459, -34.89235699999999),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.060378880291502, -34.89372133029149), // SW
                new google.maps.LatLng(-8.057680919708497, -34.89102336970849)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
        name: "MKB Meu Kaso Bar",
        opening_hours: {
            open_now: false,
            isOpen: () => false, // Added isOpen function here
            periods: [],
            weekday_text: []
        },
        photos: [
            {
                height: 1836,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/108399279051056992315\">Felipe Uchôa de Albuquerque Oliveira</a>"
                ],
                width: 3264,
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963" // Added getUrl function here
            }
        ],
        place_id: "ChIJTzAg8sAYqwcRhFsPbLZ25oY",
        plus_code: {
            compound_code: "W4R5+C3 Boa Vista, Recife - State of Pernambuco, Brazil",
            global_code: "6937W4R5+C3"
        },
        rating: 3.6,
        types: ["night_club", "bar", "point_of_interest", "establishment"],
        user_ratings_total: 74,
        vicinity: "Avenida Manoel Borba, 786 - Boa Vista, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.0487374, -34.9016158),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.050136230291503, -34.90289968029149), // SW
                new google.maps.LatLng(-8.047438269708499, -34.90020171970849)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
        name: "Fazendinha",
        opening_hours: {
            open_now: true,
            isOpen: () => true, // Added isOpen function here
            periods: [],
            weekday_text: []
        },
        photos: [
            {
                height: 4128,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/100655108263697570867\">Fabio Caio</a>"
                ],
                width: 3096,
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963" // Added getUrl function here
            }
        ],
        place_id: "ChIJ-QfXjeMYqwcR2BXd4TWnzzA",
        plus_code: {
            compound_code: "X32X+G9 Graças, Recife - State of Pernambuco, Brazil",
            global_code: "6937X32X+G9"
        },
        price_level: 2,
        rating: 4.3,
        types: ["restaurant", "bar", "food", "point_of_interest", "establishment"],
        user_ratings_total: 499,
        vicinity: "Rua das Graças, 219 - Graças, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.0545263, -34.8791054),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.055846480291502, -34.8804981802915), // SW
                new google.maps.LatLng(-8.053148519708497, -34.8778002197085)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
        name: "Bar do Geraldo",
        opening_hours: {
            open_now: false,
            isOpen: () => false, // Added isOpen function here
            periods: [],
            weekday_text: []
        },
        photos: [
            {
                height: 4080,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/104320693851928126370\">Sergio Souto</a>"
                ],
                width: 3072,
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963" // Added getUrl function here
            }
        ],
        place_id: "ChIJBYligLvhqgcR_cZsFQ_ccQ8",
        plus_code: {
            compound_code: "W4WC+59 Santo Amaro, Recife - State of Pernambuco, Brazil",
            global_code: "6937W4WC+59"
        },
        price_level: 2,
        rating: 4.5,
        types: ["restaurant", "bar", "food", "point_of_interest", "establishment"],
        user_ratings_total: 520,
        vicinity: "Rua da Piedade, 107 - Santo Amaro, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.0595718, -34.89141430000001),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.060924730291504, -34.89272783029151), // SW
                new google.maps.LatLng(-8.058226769708499, -34.89002986970851)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
        name: "Clube Metrópole",
        opening_hours: {
            open_now: false,
            isOpen: () => false, // Added isOpen function
            periods: [],
            weekday_text: []
        },
        photos: [
            {
                height: 1068,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/114421355016736484395\">Clube Metrópole</a>"
                ],
                width: 1600,
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963" // Added getUrl function
            }
        ],
        place_id: "ChIJJWonlcMYqwcRzLuONbWT6-g",
        plus_code: {
            compound_code: "W4R5+5C Boa Vista, Recife - State of Pernambuco, Brazil",
            global_code: "6937W4R5+5C"
        },
        price_level: 2,
        rating: 4.4,
        types: ["night_club", "point_of_interest", "establishment"],
        user_ratings_total: 3928,
        vicinity: "Rua das Ninfas, 125 - Boa Vista, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.0161765, -34.92572759999999),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.0175330802915, -34.92705928029149), // SW
                new google.maps.LatLng(-8.014835119708497, -34.9243613197085)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
        name: "Hamburgueria John lenno's",
        opening_hours: {
            open_now: true,
            isOpen: () => true, // Added isOpen function
            periods: [],
            weekday_text: []
        },
        photos: [
            {
                height: 750,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/117901246447144251347\">Hamburgueria John lenno's</a>"
                ],
                width: 1000,
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963" // Added getUrl function
            }
        ],
        place_id: "ChIJfdDcOMgZqwcRKC4lCGgtEiY",
        plus_code: {
            compound_code: "X3MF+GP Nova Descoberta, Recife - State of Pernambuco, Brazil",
            global_code: "6937X3MF+GP"
        },
        rating: 3.6,
        types: ["bar", "point_of_interest", "establishment"],
        user_ratings_total: 20,
        vicinity: "Rua da Imbaúba, 161 - Nova Descoberta, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.062484, -34.9325617),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.063908180291502, -34.93390868029149), // SW
                new google.maps.LatLng(-8.061210219708498, -34.9312107197085)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
        name: "KiYoi Galetos (Abdias de Carvalho)",
        opening_hours: {
            open_now: true,
            isOpen: () => true, // Added isOpen function
            periods: [],
            weekday_text: []
        },
        photos: [
            {
                height: 2268,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/112388464039894571996\">Allan Clayton</a>"
                ],
                width: 4032,
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963" // Added getUrl function
            }
        ],
        place_id: "ChIJIx3sm0gZqwcR5d93aoJAs3o",
        plus_code: {
            compound_code: "W3Q8+2X Torrões, Recife - State of Pernambuco, Brazil",
            global_code: "6937W3Q8+2X"
        },
        price_level: 2,
        rating: 4.3,
        types: ["bar", "restaurant", "food", "point_of_interest", "establishment"],
        user_ratings_total: 6485,
        vicinity: "Avenida Engenheiro Abdias de Carvalho, 1668 - Torrões, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.128961, -34.9030906),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.130414730291502, -34.90438018029149), // SW
                new google.maps.LatLng(-8.127716769708497, -34.9016822197085)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
        name: "Entre Amigos O Bode",
        opening_hours: {
            open_now: true,
            isOpen: () => true, // Added isOpen function
            periods: [],
            weekday_text: []
        },
        photos: [
            {
                height: 450,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/100732088361324959381\">Entre Amigos o Bode</a>"
                ],
                width: 980,
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963" // Added getUrl function
            }
        ],
        place_id: "ChIJWzkCccofqwcRQ-XOL1g4g3k",
        plus_code: {
            compound_code: "V3CW+CQ Boa Viagem, Recife - State of Pernambuco, Brazil",
            global_code: "6937V3CW+CQ"
        },
        price_level: 3,
        rating: 4.6,
        types: ["restaurant", "bar", "food", "point_of_interest", "establishment"],
        user_ratings_total: 8646,
        vicinity: "Rua Marquês de Valença, 50 - Boa Viagem, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-7.9969715, -34.8387539),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-7.998324430291502, -34.8400743802915), // SW
                new google.maps.LatLng(-7.995626469708498, -34.83737641970851)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
        name: "Restaurante Estrela de Olinda",
        opening_hours: {
            open_now: true,
            isOpen: () => true, // Added isOpen function
            periods: [],
            weekday_text: []
        },
        photos: [
            {
                height: 393,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/115854727708101407246\">Restaurante Estrela de Olinda</a>"
                ],
                width: 700,
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963" // Added getUrl function
            }
        ],
        place_id: "ChIJiyxzkjc9qwcRfMPKZH4aivg",
        plus_code: {
            compound_code: "2536+6F Bairro Novo, Olinda - PE, Brazil",
            global_code: "69472536+6F"
        },
        price_level: 3,
        rating: 4.5,
        types: ["bar", "restaurant", "food", "point_of_interest", "establishment"],
        user_ratings_total: 2820,
        vicinity: "Avenida Ministro Marcos Freire, 1691 - Bairro Novo, Olinda",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.115, -34.89305559999999),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.116275280291502, -34.89439258029149), // SW
                new google.maps.LatLng(-8.113577319708497, -34.8916946197085)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
        name: "Ilha dos Navegantes",
        opening_hours: {
            open_now: true,
            isOpen: () => true, // Added isOpen function
            periods: [],
            weekday_text: []
        },
        photos: [
            {
                height: 1365,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/106101940559184055588\">Ilha dos Navegantes</a>"
                ],
                width: 2048,
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963" // Added getUrl function
            }
        ],
        place_id: "ChIJAczxeKYfqwcRzRfunVaHp0c",
        plus_code: {
            compound_code: "V4P4+2Q Boa Viagem, Recife - State of Pernambuco, Brazil",
            global_code: "6937V4P4+2Q"
        },
        price_level: 3,
        rating: 4.5,
        types: ["bar", "restaurant", "food", "point_of_interest", "establishment"],
        user_ratings_total: 3454,
        vicinity: "Rua dos Navegantes, 2055 - Boa Viagem, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.0504052, -34.9274331),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.051806880291503, -34.92868738029149), // SW
                new google.maps.LatLng(-8.049108919708498, -34.9259894197085)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
        name: "CATAXÁ MOTO CLUB - Faction Recife - PE.",
        photos: [
            {
                height: 2448,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/105248163937337519021\">Peter Maia</a>"
                ],
                width: 3264,
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963" // Placeholder URL
            }
        ],
        place_id: "ChIJkd074RQZqwcRNXe2n1mR7Xw",
        plus_code: {
            compound_code: "W3XF+R2 Cordeiro, Recife - State of Pernambuco, Brazil",
            global_code: "6937W3XF+R2"
        },
        rating: 3.7,
        types: ["bar", "night_club", "point_of_interest", "establishment"],
        user_ratings_total: 3,
        vicinity: "Estrada do Forte do Arraial Novo do Bom Jesus, 344 - Cordeiro, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.036117899999999, -34.8787421),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.037481030291504, -34.88013678029149), // SW
                new google.maps.LatLng(-8.0347830697085, -34.87743881970849)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/worship_hindu-71.png",
        icon_background_color: "#7B9EB0",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/worship_hindu_pinlet",
        name: "Centro Espiritualista Oriental Swamy",
        place_id: "ChIJMSssK2IYqwcR22jm0m7XyKA",
        plus_code: {
            compound_code: "X47C+HG Campo Grande, Recife - State of Pernambuco, Brazil",
            global_code: "6937X47C+HG"
        },
        rating: 5,
        types: ["hindu_temple", "place_of_worship", "point_of_interest", "establishment"],
        user_ratings_total: 3,
        vicinity: "Rua São Caetano, 463 - Campo Grande, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.0589459, -34.89235699999999),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.060378880291502, -34.89372133029149), // SW
                new google.maps.LatLng(-8.057680919708497, -34.89102336970849)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
        name: "MKB Meu Kaso Bar",
        opening_hours: {
            open_now: false,
            isOpen: () => false, // Added isOpen function here
        },
        photos: [
            {
                height: 1836,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/108399279051056992315\">Felipe Uchôa de Albuquerque Oliveira</a>"
                ],
                width: 3264,
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963" // Placeholder URL
            }
        ],
        place_id: "ChIJTzAg8sAYqwcRhFsPbLZ25oY",
        plus_code: {
            compound_code: "W4R5+C3 Boa Vista, Recife - State of Pernambuco, Brazil",
            global_code: "6937W4R5+C3"
        },
        rating: 3.6,
        types: ["bar", "night_club", "point_of_interest", "establishment"],
        user_ratings_total: 74,
        vicinity: "Avenida Manoel Borba, 786 - Boa Vista, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.112412599999999, -34.89501070000001),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.113718830291502, -34.8963555802915), // SW
                new google.maps.LatLng(-8.111020869708497, -34.8936576197085)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
        name: "Manhattan Café Theatro",
        opening_hours: {
            open_now: false,
            isOpen: () => false, // Added isOpen function here
        },
        photos: [
            {
                height: 2322,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/103707508797122042908\">Ana Paula</a>"
                ],
                width: 4128,
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/11144167249147284296" // Placeholder URL
            }
        ],
        place_id: "ChIJQygtNK8fqwcRLSy25dgQr4M",
        plus_code: {
            compound_code: "V4Q3+2X Boa Viagem, Recife - State of Pernambuco, Brazil",
            global_code: "6937V4Q3+2X"
        },
        price_level: 3,
        rating: 4.5,
        types: ["restaurant", "bar", "food", "point_of_interest", "establishment"],
        user_ratings_total: 862,
        vicinity: "Rua Francisco da Cunha, 881 - Boa Viagem, Recife",
        html_attributions: []
    },
    {
        business_status: google.maps.places.BusinessStatus.OPERATIONAL,
        geometry: {
            location: new google.maps.LatLng(-8.0576314, -34.89849189999999),
            viewport: new google.maps.LatLngBounds(
                new google.maps.LatLng(-8.058973480291504, -34.89985618029149), // SW
                new google.maps.LatLng(-8.0562755197085, -34.89715821970849)  // NE
            )
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        icon_background_color: "#FF9E67",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
        name: "Praça do Derby Drive In",
        opening_hours: {
            open_now: true,
            isOpen: () => true, // Added isOpen function here
        },
        photos: [
            {
                height: 4032,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/102423731807797681533\">Juan Nita Maiko Jr.</a>"
                ],
                width: 3024,
                getUrl: (_opts?: google.maps.places.PhotoOptions) => "https://maps.google.com/maps/contrib/111441672491472842963" // Placeholder URL
            }
        ],
        place_id: "ChIJqeZoUdwYqwcRAN75b97gDUQ",
        plus_code: {
            compound_code: "W4R2+WJ Derby, Recife - PE, Brazil",
            global_code: "6937W4R2+WJ"
        },
        price_level: 2,
        rating: 4.1,
        types: ["bar", "point_of_interest", "establishment"],
        user_ratings_total: 989,
        vicinity: "Praça do Derby, Rua Barão de Goiana, 115 - Derby, Recife",
        html_attributions: []
    }
]