$('#submit').click(function(){
    grabData();
})
function grabData(){
    var name=$('#name').val();
    $.ajax({
        url:'http://www.khanacademy.org/api/v1/topic/'+name,
        success:function(result){
            print(result);
        }
    })
}
function print(object){
    $('#content').text('');
    for(var prop in object){
        console.log(object);
        $('#content').append('<p>'+prop+': '+object.ka_url+'</p>');
    }
}

$('#submit').click(function(){
    grabData();
})