from waitress import serve
import app1
serve(app1.app, host='0.0.0.0', port=5000)

# python waitress_server.py
# gå til localhost:5000

# finne på annen pc:, min pc ip + port