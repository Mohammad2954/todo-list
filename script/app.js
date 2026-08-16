const addTodoIcon=document.querySelector("#add-todo__icon")
const addTodo=document.querySelector("#add-todo")
const closeElem=document.querySelector("#close")
const closetodoElem=document.querySelector("#closetodo")
const creatTodoElem=document.querySelector("#creat-todo")
const valueTodoElem=document.querySelector("#value-todo")
const importedTodoElem=document.querySelector("#imported-todo")
const contentTodo=document.querySelector("#content-todo")
const addCategoryIcon=document.querySelector("#add-category__icon")
const categoryInfo=document.querySelector("#category-info")
const cetegoryClose=document.querySelector("#cetegory-close")
const closeModalCategory=document.querySelector("#close-modal__category")
const valueCategory=document.querySelector("#value-category")
const creatCategory=document.querySelector("#creat-category")
const listCategory=document.querySelector("#list-category")
const tostBox=document.querySelector("#tost-box")


let activeCategory=()=>{
    if(document.querySelector(".active")){

        localStorage.setItem("activecategory",document.querySelector(".active").innerHTML)
        return document.querySelector(".active").innerHTML}
    }

let list={"پیش فرض":[]}
let tostTimer = null
const tostBoxMessage = (message, typeMessage) => {
    // پاک کردن تایمر قبلی (اگر وجود داشته باشد)
    if (tostTimer) clearTimeout(tostTimer);

    tostBox.innerHTML = "";
    tostBox.insertAdjacentHTML("beforeend", `
        <div class="flex items-center gap-3">
            ${typeMessage 
                ? `<i class="fas fa-solid fa-check text-orange-950 border p-1 rounded-full"></i>` 
                : `<i class="fas fa-solid fa-xmark text-orange-950 border p-1 rounded-full"></i>`}
            <span class="text-orange-950">${message}</span>
        </div>
    `);

    // نمایش با انیمیشن
    tostBox.classList.remove("opacity-0", "-translate-y-4", "pointer-events-none");
    tostBox.classList.add("opacity-100", "translate-y-0");

    // مخفی کردن بعد از ۳ ثانیه
    tostTimer = setTimeout(() => {
        tostBox.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
        tostBox.classList.remove("opacity-100", "translate-y-0");
    }, 3000);
};
const showtodo=()=>{
    if(activeCategory()){
        removeHiden(addTodo)

    }else{
        tostBoxMessage("ابتدا دسته بندی بسازید",false)
    }
}
const showModal=()=>{
    removeHiden(categoryInfo)
}
const creatTodo=(event)=>{
    ////////////////////////////////
    if(valueTodoElem.value.trim().length==0){
        tostBoxMessage("محتوا خالی است !!",false)
    }else{

        const newTodo={
            id:Math.floor(Math.random()*999999),
            value:valueTodoElem.value,
            isimported:importedTodoElem.checked,
            iscomplet:false,
            time:getHoursForShow()
        }
    
        list[activeCategory()].push(newTodo)
        sortTodos(list[activeCategory()])
        addHiden(addTodo)
        valueTodoElem.value=''
        importedTodoElem.checked=false
        setlocal()
        tostBoxMessage("تودو با موفقیت اضافه شد",true)
    }
}
const cretcat=()=>{
    const newcategory=valueCategory.value
    if(!isNaN(newcategory)){
        tostBoxMessage("محتوا وارد شده نادرست است",false)
        
    }else if(newcategory.trim().length==0){
        tostBoxMessage("محتوا خالی است !!",false)
    }else{
        list[newcategory]=[]
        tostBoxMessage("دسته بندی با موفقیت اضافه شد",true)
    }
    
    
    showcategory()
    closeModal1()
    setlocal()
    sortTodos(list[document.querySelector(".active").innerText])
}
const showcategory=()=>{
    listCategory.innerHTML=""
    Object.keys(list).forEach((elem,index)=>{
        listCategory.insertAdjacentHTML("beforeend",`
            <li class="flex items-center justify-between font-serif text-black text-lg border border-amber-600 rounded-xl  mt-1 cursor-pointer  transition duration-300 ease-in w-full truncate ">
                <span onclick='activrListItem(event)' class="${index===0?"active":''} flex w-full px-2 hover:bg-orange-300 transition duration-300 ease-in truncate">${elem}</span>

                <div onclick="handeldeletCategory(event)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-red-700 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                    </svg>
                </div>
            </li>
            `)

    })
}
const handeldeletCategory=(event)=>{
    let innerData=event.target.parentElement.parentElement.firstElementChild.innerHTML
    let befordelCount=Object.keys(list).length
    delete list[innerData]
    let afterdelCount=Object.keys(list).length
    if(befordelCount===afterdelCount){
        tostBoxMessage("حذف با شکست مواجه شد",false)
    }else{
        tostBoxMessage("دسته بندی با موفقیت حذف شد",true)
    }
    showcategory()
    setlocal()
    sortTodos(list[document.querySelector(".active").innerText])

    
}
const activrListItem=(event)=>{

    document.querySelector(".active").classList.remove("active") 
    event.target.classList.add("active")
    sortTodos(list[event.target.innerText])

}
const sortTodos=(todos)=>{

    const sortedTodos = [...todos].sort((a, b) => {
    return Number(b.isimported) - Number(a.isimported);
    });
    
    insertTodo(sortedTodos)
}
const insertTodo=(arr)=>{
    if(activeCategory()){

        contentTodo.innerHTML=''
        if(arr.length){
            arr.forEach(element => {
                contentTodo.insertAdjacentHTML("beforeend",`
                    <div class="truncate mt-2 flex items-center justify-center flex-col gap-6 w-full sm:flex-row sm:justify-between px-4 py-2 border border-amber-600 rounded-lg">
                        <div class="flex items-center gap-2 truncate w-full">
                            ${element.isimported?`<i class="fas fa-solid fa-star text-red-700"></i>`:''}
                            <p class="truncate w-full ${element.iscomplet?"linethrough":""}">${element.value}</p>
                        </div>
                        <div class="flex items-center gap-2 ">
                            <div class="text-orange-800">${element.time}</div>
                            <button class="bg-orange-300 border border-orange-400 px-2 py-1 rounded-lg text-sm cursor-pointer text-orange-800 " onclick="handeldofunc(${element.id})">${element.iscomplet?"انجام شده":"انجام نشده"}</button>
                            <div onclick="handeldeletfunc(${element.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-red-700 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            </div>
                        </div>
                    </div>
                    `)
            });
        }else{
            contentTodo.insertAdjacentHTML("beforeend" ,`
                <div class="mt-2 flex items-center justify-center flex-col gap-6 w-full sm:flex-row sm:justify-between px-4 py-2 border border-amber-600 rounded-lg">
                        تودویی موجود نیست
                </div>
                `)
        }
    }
}
const closemodal=()=>{
    valueTodoElem.value=''
    importedTodoElem.checked=false
    addHiden(addTodo)
}
const closeModal1=()=>{
    valueCategory.value=''
    addHiden(categoryInfo)
}
const addHiden=(elem)=>{

    elem.classList.add("hidden")
}
const removeHiden=(elem)=>{
    elem.classList.remove("hidden")
}
const getHoursForShow=()=>{
    const getData=new Date()
    let h=getData.getHours()
    let m=getData.getMinutes()
    if(m<10){
        m=`0${m}`
    }
    if(h<10){
        h=`0${h}`
    }
    return `${h}:${m}`
}
const handeldofunc=(elemId)=>{
    const pElem=event.target.parentElement.parentElement.firstElementChild.lastElementChild
    pElem.classList.toggle("linethrough")
    const indexArr=findIndexForCange(elemId)
    
    if(pElem.classList.contains("linethrough")){
        list[activeCategory()][indexArr].iscomplet=true
        event.target.innerHTML='انجام شده'
    }else{
        list[activeCategory()][indexArr].iscomplet=false
        event.target.innerHTML='انجام نشده'
    }
    setlocal()
    tostBoxMessage("وضعیت تودو با موفقیت تغییر یافت",true)
    
}
const handeldeletfunc=(elemId)=>{
    const trashElem=event.target.parentElement.parentElement.parentElement
    const indexArr=findIndexForCange(elemId)
    list[activeCategory()].splice(indexArr,1)
    sortTodos(list[activeCategory()])
    setlocal()
    tostBoxMessage("تودو با موفقیت حذف شد",true)
}
const setlocal=()=>{
    localStorage.setItem("list",JSON.stringify(list))
}
const getlocal=()=>{
    return JSON.parse(localStorage.getItem("list"))
} 
const findIndexForCange=(elemId)=>{
    return list[activeCategory()].findIndex(elem=>elem.id===elemId)}
window.addEventListener("load",()=>{
    let data=getlocal()
    if(data){

        list=data
    }
    showcategory()
    if(document.querySelector(".active")){

        sortTodos(list[document.querySelector(".active").innerHTML])
    }
})
addTodoIcon.addEventListener("click",showtodo)
closeElem.addEventListener("click",closemodal)
closetodoElem.addEventListener("click",closemodal)
creatTodoElem.addEventListener("click",creatTodo)
addCategoryIcon.addEventListener("click",showModal)
cetegoryClose.addEventListener("click",closeModal1)
closeModalCategory.addEventListener("click",closeModal1)
creatCategory.addEventListener("click",cretcat)