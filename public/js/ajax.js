$(document).ready(function(){
    //Bắt sự kiện submit của thẻ có id = id
    // $('#view').on('click', function(e){
    //     //Khai báo và gán giá trị thẻ id
    //     var view = $('#view').val();

    //     //Ngăn chặn hành động mặc định của button
    //     e.preventDefault();
    //     if(view){
    //         $.ajax({
    //             url: '/crops/id=saqsK2bCL', //gửi req đến server
    //             type: 'POST', // phương thức
    //             dataType: 'JSON', // dạng dữ liệu 
    //             data: {seeds: {view: view}} // data gửi  đi 
    //         })
    //         .done(function(data){ //ajax nhận được data từ server
    //             $('.view_seeds').append(data.view); // chèn thêm data

    //             // lấy giá trị text của thẻ span có class = users-size,  
    //             //chuyển về dạng int rồi cộng thêm 1, sau đó gán lại vào giá trị text của chính nó
    //             $('#count_view').text((parseInt($('#count_view').text()) + 1));  
    //         })
    //         .fail(function(){
    //             alert('Không thể thêm lượt like')
    //         })
    //     }
    //     else{
    //         alert('Thêm không thành công');
    //     }
    //     return false;
    // })
})