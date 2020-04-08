$(document).ready(() => {

    console.log("front end script loaded")

    $("allcourses").show(()=>{
        console.log("hello")
    })


    axios.get('http://localhost:5000/home/getcourses')
    .then(res => {
        var allcourses = res.data.courses
        console.log(allcourses)

    
            for(var i = 0; i < allcourses.length; i++){
                var source = "#"
                var title = allcourses[i].name
                var topic = allcourses[i].topic
                var price = allcourses[i].price
                var website = allcourses[i].website
                var id = allcourses[i].id
                    
                document.getElementById("allcourses").innerHTML +=
                      "<div class=\"card\" style=\"width: 20rem;\">"
                    + "<div class=\"card-body\">"
                    + "<h5 class=\"card-title break-word\">"+ title +"</h5>"
                    + "<p class=\"card-text break-word\">Topic: " + topic + "<br>Price:" + price + "<br>Website: " + website + "<br></p>"
                    + "<a href=\"#\">redirect to website</a><br>"
                    + "<button value="+ encodeURIComponent(title) +" id=\"addButton\" type=\"button\" class=\"btn btn-primary\">Add to Wishlist</button>"
                    + "</div>"
                    + "</div>"


                const element = document.querySelectorAll("#addButton")
                element.forEach(function(el){
                    el.addEventListener('click', addToWishList);
                });

            }


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
        }

    })
    .catch(err => console.log(err))


    axios.get('http://localhost:5000/home/getwishlist')
    .then(res => {
        var allcourses = res.data.courses
        console.log(allcourses)

            for(var i = 0; i < allcourses.length; i++){
                var source = "#"
                var title = allcourses[i].name
                var topic = allcourses[i].topic
                var price = allcourses[i].price
                var website = allcourses[i].website
                var id = allcourses[i].id
                    
                document.getElementById("wishlist").innerHTML +=
                      "<div class=\"card\" style=\"width: 20rem;\">"
                    + "<div class=\"card-body\">"
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

})