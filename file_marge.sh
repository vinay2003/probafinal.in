
find . -type f \
  -not -path './node_modules/*' \
  -not -path './dist/*' \
  -not -path './public/*' \
  \( -name '*.js' -o -name '*.ts' -o -name '*.tsx'  -o -name '*.jsx' \) \
  -exec sh -c '
    for f do
      echo "// FILE: $f"
      cat "$f"
      echo ""
    done
  ' sh {} + >> all_code_dump.txt