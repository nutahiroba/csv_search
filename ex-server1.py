# coding: utf-8
#
# ex-server1.py - CGIテスト用簡易HTTPサーバ (Python)
#
import http.server

handler = http.server.CGIHTTPRequestHandler
handler.extensions_map['.html'] = 'text/html; charset=utf-8' # 文字コード設定
handler.have_fork = False # Unix (Linux/macOS)でもWindowsと同様に実行する

server_address = ('', 8080) # 待ち受けアドレス(ホスト名)とポート番号
httpd = http.server.HTTPServer(server_address, handler)
sa = httpd.socket.getsockname() # 実使用アドレスとポート番号の取得
print("host = {}, port = {}".format(sa[0], sa[1]))

httpd.serve_forever() # クライアントからの要求受付&応答の繰り返し
