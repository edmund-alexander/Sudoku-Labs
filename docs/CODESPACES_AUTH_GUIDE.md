# Quick Guide: Extracting Authorization Code in Codespaces

## The Problem

When using `clasp login --no-localhost` in GitHub Codespaces, after authorizing, Google redirects you to a localhost URL that won't load. This is NORMAL and EXPECTED!

## The Solution

You need to extract the authorization code from the redirect URL.

### Example Redirect URL:
```
http://localhost:34343/?code=4/0ATX87lNze5byl0Cq5HDlpVDzva9bn0rTkzUQNM1srjGTnDUKVMorWzCu_M-aaZ38my4C0w&scope=email%20profile...
```

### What to Copy:

**❌ WRONG** (entire URL):
```
http://localhost:34343/?code=4/0ATX87lNze5byl0Cq5HDlpVDzva9bn0rTkzUQNM1srjGTnDUKVMorWzCu_M-aaZ38my4C0w&scope=...
```

**✅ RIGHT** (only the code):
```
4/0ATX87lNze5byl0Cq5HDlpVDzva9bn0rTkzUQNM1srjGTnDUKVMorWzCu_M-aaZ38my4C0w
```

## Step-by-Step:

1. **Run the auth command**:
   ```bash
   clasp login --no-localhost
   ```

2. **Copy the URL** that appears and open it in your browser

3. **Sign in** to Google and click "Allow"

4. **You'll see** a redirect to `http://localhost:XXXXX/?code=...`
   - The page won't load - this is NORMAL
   - Don't worry about the error

5. **Look at the URL bar** in your browser

6. **Find the code** - it's the long string after `code=` and before `&`

7. **Copy ONLY the code part**:
   - Start copying after `code=`
   - Stop copying before `&scope` (or end of code)

8. **Paste the code** into the Codespaces terminal

9. **Press Enter** - authentication complete!

## Visual Guide:

```
Full URL in browser:
┌─────────────────────────────────────────────────────────────┐
│ http://localhost:34343/?code=YOUR_CODE_HERE&scope=email...  │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    Copy this part only
                              ↓
                    YOUR_CODE_HERE
                              ↓
                    Paste in terminal
```

## Using the Automated Setup Script

The `setup-admin-full.sh` script will:
1. Auto-detect you're in Codespaces
2. Show these instructions automatically
3. Use `clasp login --no-localhost` for you
4. Prompt you to paste the code

So you just need to:
- Copy the authorization code from the redirect URL
- Paste it when prompted
- Done!

## Tips:

- The code is usually 100+ characters long
- It starts with `4/0` or `4/1`
- Make sure you copy the ENTIRE code (no spaces at start/end)
- Don't include the `&scope` part or anything after it

## If You Get Stuck:

1. **Try again**: `clasp logout && clasp login --no-localhost`
2. **Use manual setup**: `bash scripts/setup-admin.sh` (no clasp needed)
3. **Check the code**: Make sure you copied ONLY the code part

---

**Remember**: The localhost redirect is EXPECTED behavior in Codespaces. Just grab the code from the URL and paste it! 🚀
