const domain='https://sprog.makepolo.net/smallprogram/'


const api={
    index:`${domain}index.php`,
    cat:`${domain}cat/index.php`,//一级分类页
    cat_class:`${domain}cat/class_list.php`,//中间分类 ?cid=9
    pro_detail: `${domain}product_medium_page.php`, //产品详情页
    product_list:`${domain}product_list.php`,
    sw:`https://sprog.makepolo.net/sw.php`,
    video_search:`${domain}video_search.php`,
    play:`${domain}play.php`

}

export {
    api
}