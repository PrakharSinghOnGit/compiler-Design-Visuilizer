from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow requests from the frontend (Vite default port 5173)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CompileRequest(BaseModel):
    source_code: str

@app.get("/health")
def read_health():
    return {"status": "ok"}

@app.post("/compile")
def compile_code(request: CompileRequest):
    from lexer import get_lexer
    
    lexer = get_lexer()
    lexer.input(request.source_code)
    
    tokens = []
    while True:
        tok = lexer.token()
        if not tok:
            break
        tokens.append({
            "type": tok.type,
            "value": tok.value,
            "lineno": tok.lineno,
            "lexpos": tok.lexpos
        })
        
    return {
        "tokens": tokens,
        "ast": {},
        "symbol_table": [],
        "semantic_errors": [],
        "ir": {},
        "optimized_ir": {},
        "target_code": "",
        "status": "success"
    }
