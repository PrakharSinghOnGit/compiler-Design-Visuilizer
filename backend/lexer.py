import ply.lex as lex

# --- Token List ---
tokens = (
    # Keywords
    "RULE", "IF", "THEN", "ELSE", "END",
    "AND", "OR", "NOT",
    "ALLOW", "DENY",

    # Identifiers & literals
    "IDENTIFIER", "NUMBER", "STRING", "BOOLEAN",

    # Operators
    "GT", "LT", "GTE", "LTE", "EQ", "NEQ",

    # Symbols
    "COLON",
)

# --- Reserved Keywords Map ---
reserved = {
    "RULE": "RULE",
    "IF": "IF",
    "THEN": "THEN",
    "ELSE": "ELSE",
    "END": "END",
    "AND": "AND",
    "OR": "OR",
    "NOT": "NOT",
    "ALLOW": "ALLOW",
    "DENY": "DENY",
    "true": "BOOLEAN",
    "false": "BOOLEAN",
}

# --- Regex Rules for Simple Tokens ---

# Operators
t_GTE = r'>='
t_LTE = r'<='
t_EQ  = r'=='
t_NEQ = r'!='
t_GT  = r'>'
t_LT  = r'<'

# Symbols
t_COLON = r':'

# --- Complex Regex Rules (Functions) ---

def t_STRING(t):
    r'\"[^"]*\"'
    return t

def t_IDENTIFIER(t):
    r'[a-zA-Z_][a-zA-Z0-9_]*'
    # Check for reserved words
    t.type = reserved.get(t.value, "IDENTIFIER")
    return t

def t_NUMBER(t):
    r'\d+'
    t.value = int(t.value)
    return t

# Ignored characters (whitespace)
t_ignore = " \t\n"

# Error handling
def t_error(t):
    print(f"Illegal character '{t.value[0]}'")
    t.lexer.skip(1)

# --- Build the Lexer ---
lexer = lex.lex()

def get_lexer():
    return lexer
