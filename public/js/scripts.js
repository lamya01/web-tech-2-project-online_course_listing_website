$(document).ready(() => {

    console.log("front end script loaded")

    axios.get('http://localhost:5000/home/getcourses')
    .then(res => {
        var allcourses = res.data.courses
        console.log(allcourses)

        for(var i = 0; i < allcourses.length; i++){
            var source = "https://www." + allcourses[i].website + ".com"
            var title = allcourses[i].name
            var topic = allcourses[i].topic
            var price = allcourses[i].price
            var website = allcourses[i].website
            var id = allcourses[i].id
                
            $("#allcourses").innerHTML +=
                "<div class=\"card\" style=\"width: 20rem;\">"
                + "<div class=\"card-body\">"
                + "<img class=\"card-img-top\" src=\"https://source.unsplash.com/1600x900/?tech,courses\"></img>"
                + "<h5 class=\"card-title break-word\">"+ title +"</h5>"
                + "<p class=\"card-text break-word\">Topic: " + topic + "<br>Price:" + price + "<br>Website: " + website + "<br></p>"
                + "<a href=" + source + ">View On Source Website</a><br>"
                + "<button value="+ encodeURIComponent(title) +" id=\"addButton\" type=\"button\" class=\"btn btn-primary\">Add to Wishlist</button>"
                + "</div>"
                + "</div>"


            const element = $("#addButton")
            element.forEach(function(el){
                el.addEventListener('click', addToWishList);
            });

        }

        displayWishlist()

    })
    .catch(err => console.log(err))



    function addToWishList(event){
        title = event.target.value
        console.log(title)

        let data = JSON.stringify({
            coursename: title
        })
    
        axios.post('http://localhost:5000/home/addtowishlist', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )

        axios.get('http://localhost:5000/home/getwishlist')
        .then(res => {
            console.log(res)
        })


        axios.get('http://localhost:5000/home/getrecs', {params: {data}})
        .then(res => {
            // console.log('recommended courses', res)
            var reclist = res.data.recs
            console.log(reclist)

            $("#wishlistrec").innerHTML = ''

            for(var i = 0; i < reclist.length; i++){
                var source = "https://www." + reclist[i].website + ".com"
                var title = reclist[i].name
                var topic = reclist[i].topic
                var price = reclist[i].price
                var website = reclist[i].website
                var id = reclist[i].id
                    
               $("#wishlistrec").innerHTML +=
                    "<div class=\"card\" style=\"width: 20rem;\">"
                    + "<div class=\"card-body\">"
                    + "<img class=\"card-img-top\" src=\"https://source.unsplash.com/1600x900/?tech,courses\"></img>"
                    + "<h5 class=\"card-title break-word\">"+ title +"</h5>"
                    + "<p class=\"card-text break-word\">Topic: " + topic + "<br>Price:" + price + "<br>Website: " + website + "<br></p>"
                    + "<a href=" + source + ">View On Source Website</a><br>"
                    + "<button value="+ encodeURIComponent(title) +" id=\"addButton\" type=\"button\" class=\"btn btn-primary\">Add to Wishlist</button>"
                    + "</div>"
                    + "</div>"
    
    
                const element = $("#addButton")
                element.forEach(function(el){
                    el.addEventListener('click', addToWishList);
                });
    
            }
            
            displayWishlist()

        })

    }


    function displayWishlist(){

        $("#wishlist").innerHTML = ''

        axios.get('http://localhost:5000/home/getwishlist')
        .then(res => {
            var allcourses = res.data.courses
            console.log('all courses', allcourses)

                for(var i = 0; i < allcourses.length; i++){
                    var source = "#"
                    var title = allcourses[i].name
                    var topic = allcourses[i].topic
                    var price = allcourses[i].price
                    var website = allcourses[i].website
                    var id = allcourses[i].id
                        
                    ("#wishlist").innerHTML +=
                        "<div class=\"card\" style=\"width: 20rem;\">"
                        + "<div class=\"card-body\">"
                        + "<img class=\"card-img-top\" src=\"https://source.unsplash.com/1600x900/?tech,courses\"></img>"
                        + "<h5 class=\"card-title break-word\">"+ title +"</h5>"
                        + "<p class=\"card-text break-word\">Topic: " + topic + "<br>Price:" + price + "<br>Website: " + website + "<br></p>"
                        + "<a href=\"#\">redirect to website</a><br>"
                        + "</div>"
                        + "</div>"


                    // const element = document.querySelectorAll("#addButton")
                    // element.forEach(function(el){
                    //     el.addEventListener('click', addToWishList);
                    // });

                }

        })
        .catch(err => console.log(err))
    }

})