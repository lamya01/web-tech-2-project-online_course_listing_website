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
                    
                document.getElementById("allcourses").innerHTML +=
                      "<div class=\"card\" style=\"width: 20rem;\">"
                    + "<div class=\"card-body\">"
                    + "<h5 class=\"card-title break-word\">"+ title +"</h5>"
                    + "<p class=\"card-text break-word\">Topic: " + topic + "<br>Price:" + price + "<br>Website: " + website + "<br></p>"
                    + "<a href=\"#\">redirect to website</a><br>"
                    + "<button type=\"button\" class=\"btn btn-primary\">Add to Wishlist</button>"
                    + "</div>"
                + "</div>"

        }




    })
    .catch(err => console.log(err))

    // const getCourses = () => {
    //     axios.get('https://jsonplaceholder.typicode.com/todos')
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))
        
    //     axios.get('localhost:5000/home/getcourses')
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))
    
    // }
})