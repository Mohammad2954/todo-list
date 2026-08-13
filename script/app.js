const addTodoIcon=document.querySelector("#add-todo__icon")
const addTodo=document.querySelector("#add-todo")
const closeElem=document.querySelector("#close")
const closetodoElem=document.querySelector("#closetodo")
const creatTodoElem=document.querySelector("#creat-todo")
const valueTodoElem=document.querySelector("#value-todo")
const importedTodoElem=document.querySelector("#imported-todo")
const contentTodo=document.querySelector("#content-todo")

let list=[]
const showtodo=()=>{
    removeHiden(addTodo)
}
const creatTodo=(event)=>{
    const newTodo={
        id:Math.floor(Math.random()*999999),
        value:valueTodoElem.value,
        isimported:importedTodoElem.checked,
        iscomplet:false
    }
    list.push(newTodo)
    sortTodos(list)
    addHiden(addTodo)
    valueTodoElem.value=''
    importedTodoElem.checked=false
}
const sortTodos=(todos)=>{
    const sortedTodos = [...todos].sort((a, b) => {
    return Number(b.isimported) - Number(a.isimported);
    });
    insertTodo(sortedTodos)
}
const insertTodo=(arr)=>{
    contentTodo.innerHTML=''
    if(arr.length){
        arr.forEach(element => {
            contentTodo.insertAdjacentHTML("beforeend",`
                <div class="mt-2 flex items-center justify-center flex-col gap-6 w-full sm:flex-row sm:justify-between px-4 py-2 border border-amber-600 rounded-lg">
                    <div class="flex items-center gap-2">
                        ${element.isimported?`<i class="fas fa-solid fa-star text-red-700"></i>`:''}
                        <p>${element.value}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="text-orange-800">${getHoursForShow()}</div>
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
const closemodal=()=>{
    valueTodoElem.value=''
    importedTodoElem.checked=false
    addHiden(addTodo)
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
    console.log(elemId);
    
    if(pElem.classList.contains("linethrough")){
        list[indexArr].iscomplet=true
        event.target.innerHTML='انجام شده'
    }else{
        list[indexArr].iscomplet=false
        event.target.innerHTML='انجام نشده'
    }
    
}
const handeldeletfunc=(elemId)=>{
    const trashElem=event.target.parentElement.parentElement.parentElement

    const indexArr=findIndexForCange(elemId)
    list.splice(indexArr,1)
    sortTodos(list)
}
const findIndexForCange=(elemId)=>{return list.findIndex(elem=>elem.id===elemId)}
window.addEventListener("load",()=>{
    let x=new Date()
    console.log(x.getHours(),x.getMinutes(),x.getSeconds());
    
    
})
addTodoIcon.addEventListener("click",showtodo)
closeElem.addEventListener("click",closemodal)
closetodoElem.addEventListener("click",closemodal)
creatTodoElem.addEventListener("click",creatTodo)