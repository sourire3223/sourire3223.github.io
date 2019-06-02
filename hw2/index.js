
// 當文件已經全載入至記憶體時，開始執行程式
$(document).ready(function() {

    $('#page').hide()

    var items = null
    var pageCount = 20
	var currPage = 1;

    var showItems = (page) => {
        if (items == null) return
        var start = (page - 1) * pageCount
        var end = start + pageCount
        $('#product-list').empty();
        for (var i = start; i < Math.min(end, items.length); i++) {
            newItem(items[i])
        }
		document.getElementById("page" + currPage).classList.remove("active")
		document.getElementById("page" + page).classList.add("active")
		currPage = page
    }

    var newItem = (item) => {
        $img = $('<img>').attr('class', 'image').attr('src', item.image)
        $h3 = $('<h3>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)
		$p2 = $('<p>').attr('class', 'price').attr("style", "color:red;").text("剩餘個數: " + item.count)
        $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p).append($p2)
        $col = $('<div>').attr('class', 'col-*').append($item)
	
        $('#product-list').append($col)
    }

    var newPage = (n) => {
        var pageNum = Math.floor(n / 20)
        pageNum = (n % 20 != 0) ? pageNum + 1 : pageNum

        $('#page-number').empty()

        $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').text('«')
        $la.on('click', function(){
			if(currPage != 1){
				showItems(currPage - 1)
			}
		})
		$lli = $('<li>').attr('class', 'page-item').append($la)

        $('#page-number').append($lli)

        // 插入分頁數字
        for (var i = 1; i <= pageNum; i++) {
            $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)

            $a.on('click', function() {
                var i = $(this).text()
                showItems(Number(i))
            })

            var strActive = ((i == 1) ? ' active' : '')
            $li = $('<li>').attr('class', 'page-item' + strActive).attr('id', 'page'+i).append($a)
            $('#page-number').append($li)
        }

        $ra = $('<a>').attr('class', 'page-link').attr('href', '#').text('»')
		 $ra.on('click', function(){
			if(currPage != pageNum){
				showItems(currPage + 1)
			}
		})
        $rli = $('<li>').attr('class', 'page-item').append($ra)
        $('#page-number').append($rli)
    }

    $('#query').on('click', function() {
		
        $.get('https://js.kchen.club/B04201020/query', function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#product-list').empty();
                    // 資料庫有回傳資料
                    items = response.items
 
                    // 預設顯示第一頁
                    
                    $('#page').show()
                    newPage(items.length)
					showItems(1)

                } else {
                    $('#message').text('查無相關資料')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }
        }, "json")
    })





	$('#insert').on('click', function() {

        // 取得商品資料
        var data = {
            item: {
                name: $('#inputProductName').val(),
                price: Number($('#inputProductPrice').val()),
                count: +$('#inputProductCount').val(),
                image: $('#inputProductImage').val(),
            }
        }

        // 新增商品
        $.post('https://js.kchen.club/B04201020/insert', data, function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#message').text('新增成功')
    
                    $('#dialog').modal('show')
                } else {
                    $('#message').text('新增失敗')

                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }
        })
    })
})