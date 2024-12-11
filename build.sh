#!/bin/bash

# Direktori untuk menyimpan log
LOG_DIR="$HOME/logs/g-learning-nextjs"
LOG_FILE="$LOG_DIR/glearning-next_make_rebuild_$(date +%Y%m%d%H%M%S).log"

# Direktori kerja untuk menjalankan perintah
WORKING_DIR="."

# Buat folder log jika belum ada
if [ ! -d "$LOG_DIR" ]; then
  mkdir -p "$LOG_DIR"
  echo "Log directory created at $LOG_DIR"
fi

# Fungsi untuk menjalankan perintah di background
run_in_background() {
  (
    cd "$WORKING_DIR" || exit 1
    echo "Starting make rebuild for glearning-next at $(date)" >"$LOG_FILE"
    # make rebuild >> "$LOG_FILE" 2>&1
    cd "$WORKING_DIR" || exit 1
    {
      echo "Starting make rebuild for glearning-next at $(date)"
      make rebuild
      echo "make rebuild for glearning-next completed at $(date)"
    } >>"$LOG_FILE" 2>&1
  ) &
  PID=$!
  echo "Process started in the background for glearning-next with PID: $PID."
  echo "Process started in the background for glearning-next with PID: $PID." >>"$LOG_FILE"

  echo "Logs can be found in $LOG_FILE"
  echo "To view logs in real-time, use: tail -f $LOG_FILE"
}

# Jalankan fungsi
run_in_background
