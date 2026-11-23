

(function () {

    const scriptTag = document.currentScript;
    const api_url = "https://ai-chat-support-psi.vercel.app/api/chat"
    const ownerId = scriptTag.getAttribute("data-owner-id")

    if (!ownerId) {
        console.log("Owner id not found")
        return
    }

    const button = document.createElement("div")
    button.innerHTML = "💬"

    Object.assign(button.style, {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "24px",
        boxShadow: "0 15px 40px rgba(0,0, 0, 0.35)",
        zIndex: "999999",

    })
    document.body.appendChild(button)

    const box = document.createElement("div")
    Object.assign(box.style, {
        position: "fixed",
        bottom: "90px",
        right: "24px",
        width: "320px",
        height: "420px",
        borderRadius: "14px",
        background: "#fff",
        display: "none",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 25px 60px rgba(0,0, 0, 0.25)",
        zIndex: "999999",
        fontFamily: "Inter, system-ui, sans-serif",

    })

    box.innerHTML = `<div style="
     background:#000;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding: 12px 14px;
    ">
    <span>Customer Support </span>
    <span id="chat-close" style="cursor:pointer; font-size:16px;">╳ </span>
    </div>
    
    <div id="chat-msg" style="
    display: flex;
    background:#f9fafb;
    overflow-y: auto;
    flex:1;
    padding:12px;
    flex-direction:column;
    min-height:0;
    
    ">
    </div>

    <div style="
    display: flex;
    border: 1px solid #d1d5db;
    padding: 8px;
    gap: 6px;
    ">

    <input id="chat-inp" placeholder="Type a message..."
    style="
    flex:1;
    padding: 8px 10px;
    font-size: 13px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    outline: none;
    "/>

    <button id="chat-send" style="
        background: #000;
        color: #fff;
          font-size: 13px;
          padding: 8px 12px;
           border: none;
           border-radius: 8px;
           cursor: pointer;
    ">Send</button>

    </div>`
    document.body.appendChild(box)

    button.onclick=()=>{
        box.style.display=box.style.display==="none" ? "flex" : "none";
        
    }

    document.querySelector("#chat-close").onclick=()=>{
        box.style.display="none"
    }

    const input = document.querySelector("#chat-inp")
    const sendBtn = document.querySelector("#chat-send")
    const msgArea = document.querySelector("#chat-msg")

    function addMessage(text, from){
        const bubble = document.createElement("div")
        bubble.innerHTML= text
        Object.assign(bubble.style,{
             borderRadius: "20px",
             maxWidth: "78%",
             padding:"8px 15px",
             fontSize: "13px",
             lineHeight:"1.4",
             marginBottom: "8px",
             alignItems:"center",
             alignSelf: from === "user" ? "flex-end" : "flex-start",
             background: from === "user" ? "#000" : "#e5e7eb",
             color: from === "user" ? "#fff" : "#111",
             
             borderTopRightRadius: from === "user" ? "8px" : "20px",
             borderTopLeftRadius: from === "user" ? "20px" : "8px",

        })

    msgArea.appendChild(bubble)
    msgArea.scrollTop = msgArea.scrollHeight
    }

    sendBtn.onclick=async()=>{
        const text = input.value.trim()
        if(!text){
            return
        }
        addMessage(text,"user")
        input.value = "";

        const typing = document.createElement("div")
        typing.innerHTML="Typing..."
        Object.assign(typing.style,{
            fontSize: "12px",
            marginBottom: "8px",
            color: "#6b7280",
            alignSelf:"flex-start",
        })

        msgArea.appendChild(typing)
        msgArea.scrollTop=msgArea.scrollHeight
        try {
            const response = await fetch(api_url,{
                method: "POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({
                    ownerId,
                    message:text
                })
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message || "Something went wrong")
            }
            msgArea.removeChild(typing)
            addMessage(data || "Something went wrong" ,"ai")
        } catch (error) {
            console.log(error)
             msgArea.removeChild(typing)
            addMessage(error.message || "Something went wrong" ,"ai")
        }
    }


})()