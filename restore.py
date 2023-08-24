"""Quickly restore incognito browsing session, without the cookies, of course."""

import os, platform

restore_sites = [
    "https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons",
    "https://nextjs.org",
    "http://localhost:8000/docs#/default/confirm_auth_code_confirm_auth_code_post",
    "http://localhost:8000/docs#/default/confirm_auth_code_confirm_auth_code_post",
    "https://fastapi.tiangolo.com/advanced/response-cookies/?h=cookies",
    "https://www.google.com/search?q=add+custom+error+msg+to+raise+indexError",
    "https://pypi.org/project/xata/1.0.0b0/",
    "https://xata-py.readthedocs.io/en/latest/api.html#xata.api.records.Records.update",
    "https://xata.io/docs/sdk/python/overview"
]

print(f"Running on Platform: {platform.system()}")

if platform.system() == 'Darwin':
    for (index, site) in enumerate(restore_sites, 1):
        print(f'{index}. Restoring "{site}"...')
        os.system(f'open -na "Google Chrome" --args --incognito {site}')



elif platform.system() == 'Windows':
    chrome_path = r"C:\Program Files\Google\Chrome\Application"
    os.chdir(chrome_path)

    for (index, site) in enumerate(restore_sites, 1):
        print(f'{index}. Restoring "{site}"...')
        os.system(f"chrome.exe --incognito {site}")
        

print(
    f"\nRestored {len(restore_sites)} {'site' if len(restore_sites) == 1 else 'sites'} from previous session.\nDone."
)
