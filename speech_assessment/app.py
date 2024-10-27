from flask import Flask, request, jsonify
import grpc
import service_pb2
import service_pb2_grpc
import os
import io
app = Flask(__name__)

# Set the gRPC server address
GRPC_SERVER_ADDRESS = '137.132.92.133:8888'

@app.route('/upload-audio', methods=['POST'])
def upload_audio():
    if 'audio' not in request.files or 'text' not in request.form:
        return jsonify({'message': 'No audio or text provided'}), 400

    # Save the uploaded audio file temporarily
    audio_file = request.files['audio']
    audio_io = io.BytesIO(audio_file.read())
    bytes_data = audio_io.getvalue() 

    text = request.form['text']

    # Set up gRPC connection and make the request
    channel = grpc.insecure_channel(GRPC_SERVER_ADDRESS)
    stub = service_pb2_grpc.ServiceStub(channel)
    grpc_request = service_pb2.Request(waveform=bytes_data, text=text)

    # Send the request to the gRPC server and receive the response
    grpc_response = stub.Recognize(grpc_request)

    # Process and format the response for the frontend
    result = {'results': []}
    for char_info in grpc_response.scored_character:
        result['results'].append({
            "reference_pinyin": char_info.reference_pinyin,
            "reference_phonemes": " ".join(char_info.reference_phone),
            "char_score": round((char_info.score_phone[0] + char_info.score_phone[1]) / 2, 1),
            "phone_list": [{
                "onset": char_info.xmin,
                "offset": char_info.xmax,
                "recognized_phonemes": " ".join(char_info.recognized_phone),
            }],
            "summary": char_info.summary
        })

    # Clean up temporary file
    # os.remove(audio_file_path)

    return jsonify(result)

if __name__ == '__main__':
    app.run(host="137.132.92.133", port=8800)
