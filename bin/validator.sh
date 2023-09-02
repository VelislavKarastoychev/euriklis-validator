
#!/bin/bash

# Determine the path to the script, accounting for global vs local usage
if [[ $0 == /* ]]; then
    # Absolute path
    script_path="$0"
else
    # Relative path
    script_path="$(pwd)/$0"
fi

# Go to the directory containing the script
cd "$(dirname "$script_path")"

# Check if the "Tests" folder exists, otherwise try "tests"
if [ -d "Tests" ]; then
    tests_folder="Tests"
elif [ -d "tests" ]; then
    tests_folder="tests"
else
    echo "No 'Tests' or 'tests' folder found."
    exit 1
fi

# Find all test files ending with "spec.js" and run them using Node.js
for file in "$tests_folder"/*spec.js; do
    if [ -f "$file" ]; then
        echo "Running $file"
        node "$file"
        echo "Finished running $file"
        echo
    fi
done
